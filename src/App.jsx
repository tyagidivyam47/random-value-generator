import { useEffect, useState } from "react";

let c = 1;

function App() {
  const [num, setNumber] = useState([]);
  const [err, setErr] = useState(false);
  // console.log(num);

  const queryParams = new URLSearchParams(window.location.search);
  const min = parseInt(queryParams.get("min"));
  const max = parseInt(queryParams.get("max"));

  // console.log(min, max);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const min = queryParams.get("min");
    const max = queryParams.get("max");
    // console.log(min, max)

    if (
      min === null ||
      max === null ||
      max < min ||
      min.length > 7 ||
      max.length > 7
    ) {
      setErr(true);
    }
  }, []);

  if (min == NaN || max == NaN) {
    setErr(true);
    // console.log(min, max);
  }

  // console.log(err);

  const generateNum = () => {
    let arr = [];
    const num = Math.floor(Math.random() * (max - min)) + min;
    // console.log("min and max : ", min, max, num);
    const stringNum = num.toString();
    const randNumLength = stringNum.length;
    // console.log("length of ", num, typeof num, " is : ", randNumLength)

    for (let i = 1; i <= 7 - randNumLength; i++) {
      arr.push(0);
    }

    for (let i = 0; i < stringNum.length; i++) {
      // console.log((stringNum[i]));
      arr.push(parseInt(stringNum[i]));
    }

    setNumber(arr);
    // console.log("arr  :", arr)
  };

  const generateTempNum = (c, interval) => {
    let arr = [];
    const num = Math.floor(Math.random() * (9 - 0)) + 0;
    for (let i = 0; i < 7; i++) {
      arr.push(num + 2 * i);
    }
    setNumber(arr);
    if (c === 3) {
      clearInterval(interval);
      generateNum();
    }
  };

  const onSpinClick = () => {
    let c = 0;
    const interval = setInterval(() => generateTempNum(c, interval), 10);
    setInterval(() => {
      c++;
      // console.log(c)
    }, 1000);
    // if (c == 3) {
    //   clearInterval(interval);
    // }
  };

  return (
    <div className="text-center">
      {err && (
        <h1 className="text-xl font-sans text-red-600">
          Please set proper Query Parameter value as max and min
        </h1>
      )}
      {!err && (
        <div className=" space-y-4">
          <div className="h-32 w-[55rem] bg-slate-300 mt-20 m-auto rounded-md">
            <div className="grid grid-cols-7 text-7xl font-extrabold">
              <div className="border-r h-32 text-center text-red-600  pt-6">
                {num[0]}
              </div>
              <div className="border-x h-32 text-center text-red-600 pt-6">
                {num[1]}
              </div>
              <div className="border-x h-32 text-center text-red-600 pt-6">
                {num[2]}
              </div>
              <div className="border-x h-32 text-center text-red-600 pt-6">
                {num[3]}
              </div>
              <div className="border-x h-32 text-center text-red-600 pt-6">
                {num[4]}
              </div>
              <div className="border-x h-32 text-center text-red-600 pt-6">
                {num[5]}
              </div>
              <div className="border-l h-32 text-center text-red-600 pt-6">
                {num[6]}
              </div>
            </div>
          </div>
          <button
            onClick={onSpinClick}
            className="p-4 bg-slate-500 transition-all hover:bg-red-600 rounded-full"
          >
            Spin
          </button>
        </div>
      )}

      {/* <div>
        <img src={Img} alt="casino" />
      </div> */}

      {/* <button onClick={onClear} className="p-2 bg-slate-500 rounded-md">
        Spin
      </button> */}
    </div>
  );
}

export default App;
