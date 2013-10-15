#include <ApplicationServices/ApplicationServices.h>
#include <Carbon/Carbon.h>

#define KEY_DELAY 2000 // 2ms

static const CGKeyCode keymap[65] = {
    kVK_ANSI_0,
    kVK_ANSI_1,
    kVK_ANSI_2,
    kVK_ANSI_3,
    kVK_ANSI_4,
    kVK_ANSI_5,
    kVK_ANSI_6,
    kVK_ANSI_7,
    kVK_ANSI_8,
    kVK_ANSI_9,
    kVK_ANSI_A,
    kVK_ANSI_B,
    kVK_ANSI_C,
    kVK_ANSI_D,
    kVK_ANSI_E,
    kVK_ANSI_F,
    kVK_ANSI_G,
    kVK_ANSI_H,
    kVK_ANSI_I,
    kVK_ANSI_J,
    kVK_ANSI_K,
    kVK_ANSI_L,
    kVK_ANSI_M,
    kVK_ANSI_N,
    kVK_ANSI_O,
    kVK_ANSI_P,
    kVK_ANSI_Q,
    kVK_ANSI_R,
    kVK_ANSI_S,
    kVK_ANSI_T,
    kVK_ANSI_U,
    kVK_ANSI_V,
    kVK_ANSI_W,
    kVK_ANSI_X,
    kVK_ANSI_Y,
    kVK_ANSI_Z,
    kVK_ANSI_Backslash,
    kVK_ANSI_Comma,
    kVK_ANSI_Equal,
    kVK_ANSI_Grave,
    kVK_ANSI_LeftBracket,
    kVK_ANSI_Minus,
    kVK_ANSI_Period,
    kVK_ANSI_Quote,
    kVK_ANSI_RightBracket,
    kVK_ANSI_Semicolon,
    kVK_ANSI_Slash,
    kVK_ANSI_Keypad0,
    kVK_ANSI_Keypad1,
    kVK_ANSI_Keypad2,
    kVK_ANSI_Keypad3,
    kVK_ANSI_Keypad4,
    kVK_ANSI_Keypad5,
    kVK_ANSI_Keypad6,
    kVK_ANSI_Keypad7,
    kVK_ANSI_Keypad8,
    kVK_ANSI_Keypad9,
    kVK_ANSI_KeypadClear,
    kVK_ANSI_KeypadDecimal,
    kVK_ANSI_KeypadDivide,
    kVK_ANSI_KeypadEnter,
    kVK_ANSI_KeypadEquals,
    kVK_ANSI_KeypadMinus,
    kVK_ANSI_KeypadMultiply,
    kVK_ANSI_KeypadPlus
};

#include <node.h>
#include <v8.h>

using namespace v8;

int sendKeys(CGKeyCode key, CGKeyCode key2, const Arguments& modifiers, bool numlock) {
    int count = 0;

    CGEventSourceRef source = CGEventSourceCreate(kCGEventSourceStateCombinedSessionState);

    CGEventRef keyDown;
    CGEventRef keyUp;

    CGEventFlags flags = (CGEventFlags) NULL;


    bool shift = false;
    bool options = false;

    int mod;

    for (int i = 0; i < modifiers.Length(); i++) {
        if (modifiers[i]->IsNumber()) {
            mod = modifiers[i]->IntegerValue();
            if (mod == kVK_Shift) {
                shift = true;
            }
            if (mod == kVK_Option) {
                options = true;
            }
        }
    }


    // Activate numlock
    if (numlock) {
        flags |= kCGEventFlagMaskNumericPad;
    }

    // Press shift
    if (shift) {
        flags |= kCGEventFlagMaskShift;
        keyDown = CGEventCreateKeyboardEvent(source, kVK_Shift, true);
        CGEventSetFlags(keyDown, flags);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
        CFRelease(keyDown);
        count++;
    }

    // Press options
    if (options) {
        flags |= kCGEventFlagMaskAlternate;
        keyDown = CGEventCreateKeyboardEvent(source, kVK_Option, true);
        CGEventSetFlags(keyDown, flags);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
        CFRelease(keyDown);
        count++;
    }

    // Type Key
    keyDown = CGEventCreateKeyboardEvent(source, key, true);
    keyUp = CGEventCreateKeyboardEvent(source, key, false);
    CGEventSetFlags(keyDown, flags);
    CGEventSetFlags(keyUp, flags);
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
    CFRelease(keyDown);
    CFRelease(keyUp);
    count++;

    // Release options
    if (options) {
        flags &= ~kCGEventFlagMaskAlternate;
        keyUp = CGEventCreateKeyboardEvent(source, kVK_Option, false);
        CGEventSetFlags(keyUp, flags);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
        CFRelease(keyUp);

    }

    // Release shift
    if (shift) {
        flags &= ~kCGEventFlagMaskShift;
        keyUp = CGEventCreateKeyboardEvent(source, kVK_Shift, false);
        CGEventSetFlags(keyUp, flags);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
        CFRelease(keyUp);
    }

    // Type key 2 without any modifier
    if (key2) {
        keyDown = CGEventCreateKeyboardEvent(source, key2, true);
        keyUp = CGEventCreateKeyboardEvent(source, key2, false);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
        CFRelease(keyDown);
        CFRelease(keyUp);
        count++;
    }

    // Type Enter
    keyDown = CGEventCreateKeyboardEvent(source, kVK_Return, true);
    keyUp = CGEventCreateKeyboardEvent(source, kVK_Return, false);
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
    CFRelease(keyDown);
    CFRelease(keyUp);

    CFRelease(source);
    return count;
}

Handle<Value> sendKeys(const Arguments& args) {
    HandleScope scope;

        int idx, idx2;
        int count = 0;
        bool numlock = false;
        bool deadkeys = false;

        if (args.Length() > 0 && args[0]->IsBoolean()) {
            deadkeys = args[0]->BooleanValue();
        }

        // This implementation should support all ISO mac layouts
        // See http://www.forlang.wsu.edu/help/keyboards2.asp for an example with the US Layout
        for (idx = 0; idx < 65; idx++) {
            numlock = idx > 46; // numpad keys

            // simple: press one key  up to 2 modifiers
            count += sendKeys(keymap[idx], (CGKeyCode)NULL, args, numlock); // normal

            if (deadkeys) {
                // deadkeys: press one key up to 2 modifiers and then press another key without any modifier
                for (idx2 = 0; idx2 < 65; idx2++) {
                    count += sendKeys(keymap[idx], keymap[idx2], args, numlock); // normal
                }
            }
        }

        return scope.Close(Integer::New(count));
}

void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "sendKeys", sendKeys);
}

NODE_MODULE(generator, init);