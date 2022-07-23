const {EventEmitter} = require('events');
class QueProcess extends EventEmitter {
    constructor(){
        super();
        this.prcs = [];
        this.id = 0;
        this.pending = false;
    }

    add(fun, input){
        const newId = ++this.id
        this.prcs.push({id : newId, fun, input});
        return new Promise((resolve, reject) => {
            this.exec();
            this.once(newId, data => {
                if(data.code === 200) return resolve(data.res);
                if(data.code === 400) return reject(data.err);
            })
        })
    }

    async exec(){
        if(!this.prcs.length){
            this.id = 0;
            return;
        }
        if(!this.pending){
            this.pending = true;
            const {id, fun, input} = this.prcs.shift();
            try {
                const res = await fun(input);
                this.emit(id, {code: 200, res})
            } catch (err) {
                this.emit(id, {code: 400, err})
            }
            this.pending = false;
            this.exec();
        }
    }
}



module.exports = QueProcess;