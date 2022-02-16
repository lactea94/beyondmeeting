import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { getCurrentUser, getAttenderDateByUserId } from '../../util/APIUtils';
import { useEffect, useState } from 'react';
import LoadingIndicator from '../../common/LoadingIndicator';


export default function LineChart() {

  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [count,setCount] = useState(0);

  const [data, setData] = useState([
    { argument: "1월", value: 10 },
    { argument: "6월", value: 20 },
    { argument: "12월", value: 30 },
  ]);

  const aaa = {
    argument: "13월", value: 30
  }

        
  useEffect(() => {
    getCurrentUser()
         .then(response => {
           setCurrentUserId(response.id)
           console.log(response.id)     

          setLoading(false)
        }).catch(error => {
          console.log(error)
          setLoading(false)
        });
      }, []);

  useEffect(() => {
    if(currentUserId)
    getAttenderDateByUserId(currentUserId)
         .then(response => {
           console.log(response.data)     
          setCount(response.data)
          // console.log(count)

          // setData([...data,aaa])

          setLoading(false)
        }).catch(error => {
          console.log(error)
          setLoading(false)
        });
      }, [currentUserId]);

      // console.log(data)
      // console.log(count)

// count가 바뀌고 data가 바뀌어야함.. 근데 왜 안되지?!


useEffect(() => {

  console.log(count)
  // data 가 JSON객체 타입
  var keys = Object.keys(count);

  // for (var i=0; i<keys.length; i++) {
    // var key = keys[i];
  keys.forEach(function(key){ // for-each로 바꿈
   
    // data에 디비에서 가져온 count{"202002:4"} 를 합쳐준다.
    setData([...data,{argument :  key , value :   count[key] }])

    console.log("argument : " + key + ", value : " + count[key])
  }); 

}, [count]);



useEffect(() => {

console.log(data)
}, [data]);

  //     useEffect(() => {

  //       // data 가 JSON객체 타입
  //       var keys = Object.keys(count);
  //       let list = [];
  //       // for (var i=0; i<keys.length; i++) {
  //         // var key = keys[i];
  //       keys.forEach(function(key){ // for-each로 바꿈
  //         var obj = new Object()
  //         obj.argument = key;
  //         obj.value = count[key];
  //         list.push(obj);
  //         // data에 디비에서 가져온 count{"202002:4"} 를 합쳐준다.
  //         // setData([...data,"{argument : " + key + ", value : " + count[key]]+"},")
  
  //         // console.log("argument : " + String(key) + ", value : " + count[key]+"},");
  //       }); 
  //       // console.log(list);
  //     }, [count]);
  //  // console.log(list);
      // console.log(data)
      // console.log(count)

    return (
  <Paper>
    <Chart
      data={data}
    >
      <ArgumentAxis />
      <ValueAxis />
       {loading ? <LoadingIndicator /> : (<LineSeries valueField="value" argumentField="argument" />)}
      <Animation />
    </Chart>
  </Paper>
  )
}


// const data = [
//   { argument: "1월", value: 10 },
//   { argument: "6월", value: 20 },
//   { argument: "12월", value: 30 },
// ];

// export default function LineChart() {

//   let count =  [0,0,0,0,0,0,0,0,0,0,0,0,0];

//   const [graph, setGraph] = useState([
//     { argument: "1월", value: count[1] },
//     { argument: "2월", value: count[2] },
//     { argument: "3월", value: count[3] },
//     { argument: "4월", value: count[4] },
//     { argument: "5월", value: count[5] },
//     { argument: "6월", value: count[6] },
//     { argument: "7월", value: count[7]},
//     { argument: "8월", value: count[8] },
//     { argument: "9월", value: count[9] },
//     { argument: "10월", value: count[10]},
//     { argument: "11월", value: count[11] },
//     { argument: "12월", value: count[12] }
//   ]);
//   const [userHasMeetingList, setUserHasMeetingList] = useState();
//   const [meeting, setMeeting] = useState('');
  
//   const [loading, setLoading] = useState(true);
//   const [counting, setCounting] = useState(0);

//   let cnt = 0;
//   const countEventHandler = ()=> {
//   setGraph((prevState) => {
//     return { ...prevState, value: count[cnt]++ }
//     });
//   }

//   // 유저가 매달 회의에 참여한 횟수를 라인그래프로..!
//   // 세로축 회의참여횟수, 가로축 n개월
//   // 회의참여횟수는 starttime
//   useEffect(() => {
//     getAttendersByUserId(1)
//      .then(response => {

//        console.log(response.data)     

//       // var size = response.data.length;

//       response.data.forEach(function(element){
//         cnt++;
//         var startTime = element.meeting.startTime;
//         console.log(startTime)
  
//         //starttime -> 0000, 00 형태로 자르기
//         var strArray=startTime.split('-');
  
//         // strArray[0] - 년
//         // strArray[1] - 월
//         // var year = strArray[0];
//         let month = strArray[1]*=1;
//         // var date = year + month;
//         // console.log(date);
//         console.log("몇월?"+month)

//         if(month === cnt) {

//           countEventHandler();

//           console.log(count[cnt])
//         }
//         console.log(count[2]);
//       });      

//       setLoading(false)
//     }).catch(error => {
//       console.log(error)
//       setLoading(false)
//     });
//   }, [graph]);
 
//   return (
//   <Paper>
//     <Chart
//       data={graph}
//     >
//       <ArgumentAxis />
//       <ValueAxis />
//        {loading ? <LoadingIndicator /> : (<LineSeries valueField="value" argumentField="argument" />) 
//     //   loading 
//     //   ? <LoadingIndicator /> 
//     //   : (data.map (data =>{
//     //     console.log(data)
//     //     var a= <LineSeries valueField={data.value} argumentField={data.argument} />
//     //     return a; 
//     // })) 
//       }
      

//         {/* {data.map(data =>{
//             console.log(data)
//             var a= <Movie argument={data.argument} value={data.value} />
            
//           return a;
//         })} */}


//       <Animation />
//     </Chart>
//   </Paper>
//   )
// };

  
  // const [Jan, setJan] = useState(0);
  // const [Feb, setFeb] = useState(0);
  // const [Mar, setMar] = useState(0);
  // const [Apr, setApr] = useState(0);
  // const [May, setMay] = useState(0);
  // const [Jun, setJun] = useState(0);
  // const [Jul, setJul] = useState(0);
  // const [Aug, setAug] = useState(0);
  // const [Sep, setSep] = useState(0);
  // const [Oct, setOct] = useState(0);
  // const [Nov, setNov] = useState(0);
  // const [Dec, setDec] = useState(0);