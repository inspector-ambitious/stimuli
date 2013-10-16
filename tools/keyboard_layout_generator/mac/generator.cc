#include <ApplicationServices/ApplicationServices.h>
#include <Carbon/Carbon.h>

#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> sendCombo(const Arguments& args) {
    HandleScope scope;

    if (args.Length() != 1) {
        ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
        return scope.Close(Undefined());
    }

    Local<Object> config = args[0]->ToObject();

    if (config->Get(String::New("key1"))->IsUndefined()) {
        ThrowException(Exception::TypeError(String::New("You must specify a key1")));
        return scope.Close(Undefined());
    }

    CGKeyCode key1 = (CGKeyCode)(config->Get(String::New("key1"))->IntegerValue());

    CGKeyCode key2 = (CGKeyCode)NULL;

    if (!(config->Get(String::New("key2"))->IsUndefined())) {
        key2 = (CGKeyCode)(config->Get(String::New("key2"))->IntegerValue());
    }

    bool numlock = false;

    if (!(config->Get(String::New("numLock"))->IsUndefined())) {
        numlock = config->Get(String::New("numLock"))->BooleanValue();
    }

    int delay = 0;

    if (!(config->Get(String::New("delay"))->IsUndefined())) {
        delay = config->Get(String::New("delay"))->IntegerValue();
    }

    bool shift = false;


    if (!(config->Get(String::New("shift"))->IsUndefined())) {
       shift = config->Get(String::New("shift"))->BooleanValue();
    }

    bool options = false;

    if (!(config->Get(String::New("options"))->IsUndefined())) {
       options = config->Get(String::New("options"))->BooleanValue();
    }

    int count = 0;
    CGEventSourceRef source = CGEventSourceCreate(kCGEventSourceStateCombinedSessionState);

    CGEventRef keyDown;
    CGEventRef keyUp;

    CGEventFlags flags = (CGEventFlags) NULL;


    // Activate numlock
    if (numlock) {
        flags |= kCGEventFlagMaskNumericPad;
    }

    // Press shift
    if (shift) {
        flags |= kCGEventFlagMaskShift;
        keyDown = CGEventCreateKeyboardEvent(source, kVK_Shift, true);
        CGEventSetFlags(keyDown, flags);
        usleep(delay);
        CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
        CFRelease(keyDown);
        count++;
    }

    // Press options
    if (options) {
        flags |= kCGEventFlagMaskAlternate;
        keyDown = CGEventCreateKeyboardEvent(source, kVK_Option, true);
        CGEventSetFlags(keyDown, flags);
        usleep(delay);
        CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
        CFRelease(keyDown);
        count++;
    }

    // Type Key
    keyDown = CGEventCreateKeyboardEvent(source, key1, true);
    keyUp = CGEventCreateKeyboardEvent(source, key1, false);
    CGEventSetFlags(keyDown, flags);
    CGEventSetFlags(keyUp, flags);
    usleep(delay);
    CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
    usleep(delay);
    CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
    CFRelease(keyDown);
    CFRelease(keyUp);
    count++;

    // Release options
    if (options) {
        flags &= ~kCGEventFlagMaskAlternate;
        keyUp = CGEventCreateKeyboardEvent(source, kVK_Option, false);
        CGEventSetFlags(keyUp, flags);
        usleep(delay);
        CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
        CFRelease(keyUp);

    }

    // Release shift
    if (shift) {
        flags &= ~kCGEventFlagMaskShift;
        keyUp = CGEventCreateKeyboardEvent(source, kVK_Shift, false);
        CGEventSetFlags(keyUp, flags);
        usleep(delay);
        CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
        CFRelease(keyUp);
    }

    // Type key 2 without any modifier
    if (key2) {
        keyDown = CGEventCreateKeyboardEvent(source, key2, true);
        keyUp = CGEventCreateKeyboardEvent(source, key2, false);
        usleep(delay);
        CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
        usleep(delay);
        CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
        CFRelease(keyDown);
        CFRelease(keyUp);
        count++;
    }

    // Type Space
    keyDown = CGEventCreateKeyboardEvent(source, kVK_Space, true);
    keyUp = CGEventCreateKeyboardEvent(source, kVK_Space, false);
    usleep(delay);
    CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
    usleep(delay);
    CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
    CFRelease(keyDown);
    CFRelease(keyUp);

    CFRelease(source);
    return scope.Close(Integer::New(count));
}

//Handle<Value> sendKeys(const Arguments& args) {
//    HandleScope scope;
//
//        int idx, idx2;
//        int count = 0;
//        bool numlock = false;
//        bool deadkeys = false;
//
//        if (args.Length() > 0 && args[0]->IsBoolean()) {
//            deadkeys = args[0]->BooleanValue();
//        }
//
//        // This implementation should support all ISO mac layouts
//        // See http://www.forlang.wsu.edu/help/keyboards2.asp for an example with the US Layout
//        for (idx = 0; idx < 65; idx++) {
//            numlock = idx > 46; // numpad keys
//
//            // simple: press one key  up to 2 modifiers
//            count += sendKeys(keymap[idx], (CGKeyCode)NULL, args, numlock); // normal
//
//            if (deadkeys) {
//                // deadkeys: press one key up to 2 modifiers and then press another key without any modifier
//                for (idx2 = 0; idx2 < 65; idx2++) {
//                    count += sendKeys(keymap[idx], keymap[idx2], args, numlock); // normal
//                }
//            }
//        }
//
//        return scope.Close(Integer::New(count));
//}

void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "sendCombo", sendCombo);
}

NODE_MODULE(generator, init);