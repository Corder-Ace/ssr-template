// const parser = require('@babel/parser');
// const traverse = require('@babel/traverse').default;
// const generator = require('@babel/generator').default;
// const t = require('@babel/types');
//
// module.exports = function (source) {
//   const ast = parser.parse(source, {sourceType: 'module'});
//   traverse(ast, {
//     CallExpression(path) {
//       if (t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, {name: "console"})) {
//         path.remove()
//       }
//     }
//   });
//   const output = generator(ast, {}, source);
//   return output.code
// };
class firstPlugin{
    constructor(options){
        this.options = options
    }
    apply(compiler){
        compiler.plugin('emit',(compilation,callback)=>{
            let str = ''
            for (let filename in compilation.assets){
                str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
            }
            // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
            compilation.assets['fileSize.md'] = {
                source:function(){
                    return str
                },
                size:function(){
                    return str.length
                }
            }
            callback()
        })
    }
}
module.exports = firstPlugin
