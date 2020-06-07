
// 封装分割文件读取
function PartFileReader(files, type, event) {
    this.files = files;
    this.type = type;
    this.event = event;
    this.total = files.size; // 总长
    this.step = 1024 * 1024; // 截取的大小
    this.loaded = 0;
    this.reader = new FileReader();
    this.abort = this.reader.abort;
    this.readPartFile(0);
    this.bindEvent();
}

PartFileReader.prototype.readPartFile = function (start) {
    if (this.files.slice) {
        var file = this.files.slice(start, start + this.step);
        // 截取一部分，加载好了，又截取一部分，感觉更慢，应该加工人操作加载 以后扩展
        switch (this.type) {
            case 'readAsBinaryString':
                this.reader.readAsBinaryString(file);
                break;
            case 'readAsDataURL':
                this.reader.readAsDataURL(file);
                break;
            case 'readAsText':
                this.reader.readAsText(file);
                break;
            case 'readAsArrayBuffer':
                this.reader.readAsArrayBuffer(file);
                break;
            default:
                break;
        }
    }
}
PartFileReader.prototype.bindEvent = function () {
    var self = this;
    this.reader.onloadstart = function (e) {
        self.event.loadstart && self.event.loadstart.call(this, e); // this == e.target  b的this指向a   实参也传给a 操作也是输出a的操作
    }
    this.reader.onprogress  = function (e) {
        // self.loaded += e.loaded;
        console.log(1,self)
        self.event.progress && self.event.progress.call(this, e, self.loaded, self.total);
    }
    this.reader.onload = function (e) {
        self.loaded += e.loaded;
        self.event.load && self.event.load.call(this, e);
        if (self.loaded < self.total) {
            self.readPartFile(self.loaded); // 截取一段之后 还有内容 就继续截取
        }
    }
    this.reader.onloadend = function (e) {
        self.event.loadend && self.event.loadend.call(this, e);
    }
    this.reader.onabort = function (e) {
        self.event.abort && self.event.abort.call(this, e);
    }
}