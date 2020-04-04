# Demo for bug in JSON5 package

Attempting to parse a hexadecimal numeric literal with JSON5 v2.1.2 hangs for a
while and eventually results in an OOM on Node v12.

You can try this for yourself:

```sh
git clone https://github.com/mkantor/demo-json5-parse-bug.git
cd demo-json5-parse-bug
npm install
npm run demo
```

Here's the stack trace I see:

```
==== JS stack trace =========================================

    0: ExitFrame [pc: 0x100950919]
Security context: 0x103fe90c08d1 <JSObject>
    1: test [0x103fe90cfc89](this=0x103f87a496b1 <JSRegExp <String[#11]: [0-9A-Fa-f]>>,0x103f049004b1 <undefined>)
    2: lex [0x103fe4a74489] [/Users/mk/Code/test/node_modules/json5/lib/parse.js:~64] [pc=0x134fd040629f](this=0x103f97a82301 <JSGlobal Object>)
    3: parse [0x103fea4a1021] [/Users/mk/Code/test/node_modules/json5/lib/parse.js:25] [bytecode=0x103f...

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0x100080c68 node::Abort() [/usr/local/bin/node]
 2: 0x100080dec node::errors::TryCatchScope::~TryCatchScope() [/usr/local/bin/node]
 3: 0x100185167 v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [/usr/local/bin/node]
 4: 0x100185103 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [/usr/local/bin/node]
 5: 0x10030b2f5 v8::internal::Heap::FatalProcessOutOfMemory(char const*) [/usr/local/bin/node]
 6: 0x10030c9c4 v8::internal::Heap::RecomputeLimits(v8::internal::GarbageCollector) [/usr/local/bin/node]
 7: 0x100309837 v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags) [/usr/local/bin/node]
 8: 0x1003077fd v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/usr/local/bin/node]
 9: 0x1003066b1 v8::internal::Heap::HandleGCRequest() [/usr/local/bin/node]
10: 0x1002cc0c0 v8::internal::StackGuard::HandleInterrupts() [/usr/local/bin/node]
11: 0x100617e9c v8::internal::Runtime_StackGuard(int, unsigned long*, v8::internal::Isolate*) [/usr/local/bin/node]
12: 0x100950919 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvOnStack_NoBuiltinExit [/usr/local/bin/node]
./demo.sh: line 11: 42229 Abort trap: 6           npm run demo
./demo.sh: line 11: exit status of last command: 134
```
