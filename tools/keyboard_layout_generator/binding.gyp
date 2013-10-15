{
     "conditions": [
          ["OS=='linux'", {
                "targets": [{
                    "target_name": "generator",
                    "sources": ["linux/generator.cc"]
                }]
          }],
          ["OS=='win'", {
                "targets": [{
                    "target_name": "generator",
                    "sources": ["windows/generator.cc"]
                }]
          }],
          ["OS=='mac'", {
                "targets": [{
                    "target_name": "generator",
                    "sources": ["mac/generator.cc"]
                }]
          }]
     ]
}