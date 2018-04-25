// let allData;
// function fetchJSONFile(path, callback) {
//     let httpRequest = new XMLHttpRequest();
//     httpRequest.onreadystatechange = function() {
//         if (httpRequest.readyState === 4) {
//             if (httpRequest.status === 200) {
//                 let data = JSON.parse(httpRequest.responseText);
//                 if (callback) callback(data);
//             }
//         }
//     };
//     httpRequest.open('GET', path,false);
//     httpRequest.send();
// }
//
// fetchJSONFile('/p5-interceptor/data.min.json', function(data){
//   allData = data;
// });