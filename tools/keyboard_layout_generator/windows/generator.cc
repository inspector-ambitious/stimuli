

#include <node.h>
#include <v8.h>
#include <windows.h>

using namespace v8;

Handle<Value> sendCombo(const Arguments& args) {
    HandleScope scope;

    INPUT ip;
        
    if (args.Length() != 1) {
        ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
        return scope.Close(Undefined());
    }

    Local<Object> config = args[0]->ToObject();

    if (config->Get(String::New("key1"))->IsUndefined()) {
        ThrowException(Exception::TypeError(String::New("You must specify a key1")));
        return scope.Close(Undefined());
    }

    int key1 = config->Get(String::New("key1"))->IntegerValue();

    int key2 = 0;

    if (!(config->Get(String::New("key2"))->IsUndefined())) {
        key2 = config->Get(String::New("key2"))->IntegerValue();
    }

    int delay = 0;

    if (!(config->Get(String::New("delay"))->IsUndefined())) {
        delay = config->Get(String::New("delay"))->IntegerValue();
    }

    bool shift = false;


    if (!(config->Get(String::New("shift"))->IsUndefined())) {
       shift = config->Get(String::New("shift"))->BooleanValue();
    }

    bool altgr = false;

    if (!(config->Get(String::New("altgr"))->IsUndefined())) {
       altgr = config->Get(String::New("altgr"))->BooleanValue();
    }

    int count = 0;

    // Press shift
    if (shift) {
        memset(&ip, 0, sizeof(INPUT));
        ip.type = INPUT_KEYBOARD;
        ip.ki.wScan = 0;
        ip.ki.time = 0;
        ip.ki.dwExtraInfo = 0;
        ip.ki.wVk = 0xA0;
        ip.ki.dwFlags = 0;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
    }
    
    // Press altgr
    if (altgr) {
        ip.type = INPUT_KEYBOARD;
        ip.ki.wScan = 0;
        ip.ki.time = 0;
        ip.ki.dwExtraInfo = 0;
        ip.ki.wVk = 0xA2;
        ip.ki.dwFlags = 0;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
        ip.type = INPUT_KEYBOARD;
        ip.ki.wScan = 0;
        ip.ki.time = 0;
        ip.ki.dwExtraInfo = 0;
        ip.ki.wVk = 0xA4;
        ip.ki.dwFlags = 0;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
    }
    
    // Type key
    memset(&ip, 0, sizeof(INPUT));
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;
    ip.ki.wVk = key1;
    ip.ki.dwFlags = 0;
    Sleep(delay);
    SendInput(1, &ip, sizeof(INPUT));
    ip.ki.dwFlags = KEYEVENTF_KEYUP;
    Sleep(delay);
    SendInput(1, &ip, sizeof(INPUT));
    
    // Release altgr
    if (altgr) {
        ip.type = INPUT_KEYBOARD;
        ip.ki.wScan = 0;
        ip.ki.time = 0;
        ip.ki.dwExtraInfo = 0;
        ip.ki.wVk = 0xA2;
        ip.ki.dwFlags = KEYEVENTF_KEYUP;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
        ip.type = INPUT_KEYBOARD;
        ip.ki.wScan = 0;
        ip.ki.time = 0;
        ip.ki.dwExtraInfo = 0;
        ip.ki.wVk = 0xA4;
        ip.ki.dwFlags = KEYEVENTF_KEYUP;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
    }
    
    // Release shift
    if (shift) {
        memset(&ip, 0, sizeof(INPUT));
        ip.type = INPUT_KEYBOARD;
        ip.ki.wScan = 0;
        ip.ki.time = 0;
        ip.ki.dwExtraInfo = 0;
        ip.ki.wVk = 0xA0;
        ip.ki.dwFlags = KEYEVENTF_KEYUP;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
    }
    
    // Type 2 key
    if (key2 != 0) {
        memset(&ip, 0, sizeof(INPUT));
        ip.type = INPUT_KEYBOARD;
        ip.ki.wScan = 0;
        ip.ki.time = 0;
        ip.ki.dwExtraInfo = 0;
        ip.ki.wVk = key2;
        ip.ki.dwFlags = 0;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
        ip.ki.dwFlags = KEYEVENTF_KEYUP;
        Sleep(delay);
        SendInput(1, &ip, sizeof(INPUT));
    }
    
    // Press space
    memset(&ip, 0, sizeof(INPUT));
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0;
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;
    ip.ki.wVk = 0x20;
    ip.ki.dwFlags = 0;
    Sleep(delay);
    SendInput(1, &ip, sizeof(INPUT));
    ip.ki.dwFlags = KEYEVENTF_KEYUP;
    Sleep(delay);
    SendInput(1, &ip, sizeof(INPUT));
    return scope.Close(Integer::New(count));
}


void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "sendCombo", sendCombo);
}

NODE_MODULE(generator, init);