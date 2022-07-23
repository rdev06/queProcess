# Que Process
Que Process process your function in a Synchronous Queue. All the process will be in a queue and it will run one by one.

# Features

  - Simple to Use
  - Light Weight
  - Zero Dependency 

# Working
 
```javascript   
//including queProcess 
const QueProcess = require('queProcess');


const quePr = new QueProcess();


function job(input) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(input);
        }, 5000);
    })
}

function job2(input) {
    return input
}

function job3(input) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(input);
        }, 1000);
    })
}

quePr.add(job, 'the is resolved').then(data => console.log(data))
quePr.add(job2, 'more resolved').then(data => console.log('more',data))
quePr.add(job3, 'another resolved').then(data => console.log('another',data))
```

## License