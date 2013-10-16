#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <linux/input.h>
#include <linux/uinput.h>

#define die(str, args...) do { \
        perror(str); \
        exit(EXIT_FAILURE); \
    } while(0)

#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> sendCombo(const Arguments& args) {
    HandleScope scope;

    int fd;

    fd = open("/dev/input/by-path/platform-i8042-serio-0-event-kbd", O_WRONLY | O_NONBLOCK);
    if(fd < 0) {
        ThrowException(Exception::TypeError(String::New("You must be root to run the program")));
        return scope.Close(Undefined());
    }
        
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

    bool altgr = false;

    if (!(config->Get(String::New("altgr"))->IsUndefined())) {
       altgr = config->Get(String::New("altgr"))->BooleanValue();
    }

    int count = 0;
  
  
  struct input_event keyEv, shiftEv, altgrEv, numLockEv;


	
	if (numlock) {
		// Type numlock
		usleep(delay);
		memset(&numLockEv, 0, sizeof(numLockEv));
		numLockEv.type = EV_KEY;
		numLockEv.code = KEY_NUMLOCK;
		numLockEv.value = 1;
		write(fd, &numLockEv, sizeof(numLockEv));
		numLockEv.code = KEY_NUMLOCK;
		numLockEv.value = 0;
		write(fd, &numLockEv, sizeof(numLockEv));
	}
	
	// Press shift
	if (shift) {
		usleep(delay);
		memset(&shiftEv, 0, sizeof(shiftEv));
		shiftEv.type = EV_KEY;
		shiftEv.code = KEY_RIGHTSHIFT;
		shiftEv.value = 1;
		write(fd, &shiftEv, sizeof(shiftEv));
    }
    
    // Press altgr
    if (altgr) {
		usleep(delay);
		memset(&altgrEv, 0, sizeof(altgrEv));
		altgrEv.type = EV_KEY;
		altgrEv.code = KEY_ISO;
		altgrEv.value = 1;
		write(fd, &altgrEv, sizeof(altgrEv));
    }
    
	// Type key
	usleep(delay);
	memset(&keyEv, 0, sizeof(keyEv));
	keyEv.type = EV_KEY;
	keyEv.code = key1;
	keyEv.value = 1;
	write(fd, &keyEv, sizeof(keyEv));
	keyEv.code = key1;
	keyEv.value = 0;
    write(fd, &keyEv, sizeof(keyEv));
    
    // Release altgr
    if (altgr) {
		usleep(delay);
		memset(&altgrEv, 0, sizeof(altgrEv));
		altgrEv.type = EV_KEY;
		altgrEv.code = KEY_ISO;
		altgrEv.value = 0;
		write(fd, &altgrEv, sizeof(altgrEv));
    }
    
    // Release shift
	if (shift) {
		usleep(delay);
		memset(&shiftEv, 0, sizeof(shiftEv));
		shiftEv.type = EV_KEY;
		shiftEv.code = KEY_RIGHTSHIFT;
		shiftEv.value = 0;
		write(fd, &shiftEv, sizeof(shiftEv));
    }
    
    // Type 2 key
    if (key2) {
		usleep(delay);
		memset(&keyEv, 0, sizeof(keyEv));
		keyEv.type = EV_KEY;
		keyEv.code = key2;
		keyEv.value = 1;
		write(fd, &keyEv, sizeof(keyEv));
		keyEv.code = key2;
		keyEv.value = 0;
		write(fd, &keyEv, sizeof(keyEv));
	}
	
    if (numlock) {
		//Type numlock again to release
		usleep(delay);
		memset(&numLockEv, 0, sizeof(numLockEv));
		numLockEv.type = EV_KEY;
		numLockEv.code = KEY_NUMLOCK;
		numLockEv.value = 1;
		write(fd, &numLockEv, sizeof(numLockEv));
		numLockEv.code = KEY_NUMLOCK;
		numLockEv.value = 0;
		write(fd, &numLockEv, sizeof(numLockEv));
	}
	
	// Press space
	usleep(delay);
	memset(&numLockEv, 0, sizeof(numLockEv));
	numLockEv.type = EV_KEY;
	numLockEv.code = KEY_SPACE;
	numLockEv.value = 1;
	write(fd, &numLockEv, sizeof(numLockEv));
	numLockEv.code = KEY_SPACE;
	numLockEv.value = 0;
	write(fd, &numLockEv, sizeof(numLockEv));
	
	close(fd);
    return scope.Close(Integer::New(count));
}


void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "sendCombo", sendCombo);
}

NODE_MODULE(generator, init);
