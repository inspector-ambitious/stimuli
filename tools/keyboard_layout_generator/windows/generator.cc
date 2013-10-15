#include <ApplicationServices/ApplicationServices.h>
#include <Carbon/Carbon.h>

#define KEY_DELAY 0 // 5ms

static const CGKeyCode keymap[65] = {
    kVK_ANSI_A,
    kVK_ANSI_S,
    kVK_ANSI_D,
    kVK_ANSI_F,
    kVK_ANSI_H,
    kVK_ANSI_G,
    kVK_ANSI_Z,
    kVK_ANSI_X,
    kVK_ANSI_C,
    kVK_ANSI_V,
    kVK_ANSI_B,
    kVK_ANSI_Q,
    kVK_ANSI_W,
    kVK_ANSI_E,
    kVK_ANSI_R,
    kVK_ANSI_Y,
    kVK_ANSI_T,
    kVK_ANSI_1,
    kVK_ANSI_2,
    kVK_ANSI_3,
    kVK_ANSI_4,
    kVK_ANSI_6,
    kVK_ANSI_5,
    kVK_ANSI_Equal,
    kVK_ANSI_9,
    kVK_ANSI_7,
    kVK_ANSI_Minus,
    kVK_ANSI_8,
    kVK_ANSI_0,
    kVK_ANSI_RightBracket,
    kVK_ANSI_O,
    kVK_ANSI_U,
    kVK_ANSI_LeftBracket,
    kVK_ANSI_I,
    kVK_ANSI_P,
    kVK_ANSI_L,
    kVK_ANSI_J,
    kVK_ANSI_Quote,
    kVK_ANSI_K,
    kVK_ANSI_Semicolon,
    kVK_ANSI_Backslash,
    kVK_ANSI_Comma,
    kVK_ANSI_Slash,
    kVK_ANSI_N,
    kVK_ANSI_M,
    kVK_ANSI_Period,
    kVK_ANSI_Grave,
    kVK_ANSI_KeypadDecimal,
    kVK_ANSI_KeypadMultiply,
    kVK_ANSI_KeypadPlus,
    kVK_ANSI_KeypadClear,
    kVK_ANSI_KeypadDivide,
    kVK_ANSI_KeypadEnter,
    kVK_ANSI_KeypadMinus,
    kVK_ANSI_KeypadEquals,
    kVK_ANSI_Keypad0,
    kVK_ANSI_Keypad1,
    kVK_ANSI_Keypad2,
    kVK_ANSI_Keypad3,
    kVK_ANSI_Keypad4,
    kVK_ANSI_Keypad5,
    kVK_ANSI_Keypad6,
    kVK_ANSI_Keypad7,
    kVK_ANSI_Keypad8,
    kVK_ANSI_Keypad9
};

#include <node.h>
#include <v8.h>

using namespace v8;

void send(CGKeyCode key, CGKeyCode key2, bool shift, bool options, bool numlock) {


    CGEventSourceRef source = CGEventSourceCreate(kCGEventSourceStateCombinedSessionState);

    CGEventRef enterDown = CGEventCreateKeyboardEvent(source, kVK_Return, true);
    CGEventRef enterUp = CGEventCreateKeyboardEvent(source, kVK_Return, false);

    CGEventRef keyDown = CGEventCreateKeyboardEvent(source, key, true);
    CGEventRef keyUp = CGEventCreateKeyboardEvent(source, key, false);

    CGEventFlags flags = (CGEventFlags) NULL;

    CGEventRef shiftDown, shiftUp, optionsDown, optionsUp, key2Down, key2Up;

    if (numlock) {
        flags = flags | kCGEventFlagMaskAlternate; // numlock on
    }

    // Press shift
    if (shift) {
        shiftDown = CGEventCreateKeyboardEvent(source, kVK_Shift, true);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, shiftDown);
        CFRelease(shiftDown);
        flags = flags | kCGEventFlagMaskShift;
    }

    // Press options
    if (options) {
        optionsDown = CGEventCreateKeyboardEvent(source, kVK_Option, true);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, optionsDown);
        CFRelease(optionsDown);
        flags = flags | kCGEventFlagMaskAlternate;
    }

    // Type Key
    CGEventSetFlags(keyDown, flags);
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, keyDown);
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, keyUp);
    CFRelease(keyDown);
    CFRelease(keyUp);

    // Release options
    if (options) {
        optionsUp = CGEventCreateKeyboardEvent(source, kVK_Option, false);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, optionsUp);
        CFRelease(optionsUp);
    }

    // Release shift
    if (shift) {
      shiftUp = CGEventCreateKeyboardEvent(source, kVK_Shift, false);
      usleep(KEY_DELAY);
      CGEventPost(kCGAnnotatedSessionEventTap, shiftUp);
      CFRelease(shiftUp);
    }

    // Type key 2 without any modifier
    if (key2) {
        key2Down = CGEventCreateKeyboardEvent(source, key2, true);
        key2Up = CGEventCreateKeyboardEvent(source, key2, false);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, key2Down);
        usleep(KEY_DELAY);
        CGEventPost(kCGAnnotatedSessionEventTap, key2Up);
        CFRelease(key2Down);
        CFRelease(key2Up);
    }

    // Type Enter
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, enterDown);
    usleep(KEY_DELAY);
    CGEventPost(kCGAnnotatedSessionEventTap, enterUp);
    CFRelease(enterDown);
    CFRelease(enterUp);

    CFRelease(source);
}

Handle<Value> Method(const Arguments& args) {
    HandleScope scope;

        int idx, idx2;

        bool numlock;

        // TODO: implement a logic to support combinations with this JIS keyboard keys
        // kVK_JIS_Yen
        // kVK_JIS_Underscore
        // kVK_JIS_KeypadComma
        // kVK_JIS_Eisu
        // kVK_JIS_Kana

        // This implementation should support all ISO mac layouts
        // See http://www.forlang.wsu.edu/help/keyboards2.asp for an example with the US Layout
        for (idx = 0; idx < 65; idx++) {
            numlock = idx > 46; // numpad keys

            // simple: one key and up to 2 modifiers
            send(keymap[idx], null, false, false, numlock); // normal
            send(keymap[idx], null, true, false, numlock);  // shift
            send(keymap[idx], null, false, true, numlock); // options
            send(keymap[idx], null, true, true, numlock);  // shift + options

            // sequential: one key up to 2 modifiers and then another key without any modifier
            for (idx2 = 0; idx2 < 65; idx2++) {
                send(keymap[idx], keymap[idx2], false, false, numlock); // normal
                send(keymap[idx], keymap[idx2], true, false, numlock);  // shift
                send(keymap[idx], keymap[idx2], false, true, numlock); // options
                send(keymap[idx], keymap[idx2], true, true, numlock);  // shift + options
            }
        }

        return scope.Close(String::New("Done."));
}

void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "sendAllKeys", Method);
}

NODE_MODULE(generator, init);
