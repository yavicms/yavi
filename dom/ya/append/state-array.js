const ArrayAction = require("./array-action");
/**
 * 
 * @param {ArraySate} arrayElement
 * @param {HTMLDocument} node 
 */
module.exports = function AppendArraySate(arrayElement, node) {

    /**
     *  Lắng nghe sự kiện từ useState()
     *  action_info : [render_action, callback, array_data]
     *  - render_action: appendChild, prependChild, replaceChild
     *  - callback: chính là hàm callback trong câu lệnh: Array.map(callback)
     *  - array_data: là dữ liệu trong khi setSate(array_data)
     */
    /**
     *  Code ở JSX
     *  
     *  function Div(props){
     *      let [list, setList] = useState([1,2,3]);
     * 
     *      useEffect(function(){
     *          setList([3,4]);
     *      });
     * 
     *      return(<div>{list.map(number => <span>{number}</span>)}</div>);
     *  }
     */
    let arrayAction = new ArrayAction();

    arrayAction.callback = arrayElement.callback;

    arrayElement.on(function (array_data) {
        arrayAction[arrayElement.render_action](array_data);
    });

    node.appendChild(arrayAction.startedElement(arrayElement.value));

    return node;
}