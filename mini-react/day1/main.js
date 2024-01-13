import ReactDom from './core/ReactDom.js'
import App from './App.js'
// case1
// const rootEl = document.getElementById('root');
// const domEl = document.createElement('div');
// domEl.id = 'app';
// const textEl = document.createTextNode('');
// textEl.nodeValue = 'app'
// rootEl.append(textEl);

// case2
// const dom = {
//     type: 'div',
//     props: {
//         id: 'app',
//         children: [
//             {
//                 type: textTyp,
//                 props: {
//                     nodeValue: 'app',
//                     children: []
//                 }
//             }
//         ]
//     }
// }


// 创建的虚拟dom
// const textHtmlJson = createTextNode('app');
// const App = createElement('div', { id: 'app' }, textHtmlJson);
// const rootEl = document.getElementById('root');
// const appEl = document.createElement(App.type);
// appEl.id = App.props.id;
// rootEl.append(appEl);

// const textEl = document.createTextNode('');
// textEl.nodeValue = textHtmlJson.nodeValue;
// appEl.append(textEl);







// const textHtmlJson = createTextNode('app');

ReactDom.createRoot(document.getElementById('root')).render(App);