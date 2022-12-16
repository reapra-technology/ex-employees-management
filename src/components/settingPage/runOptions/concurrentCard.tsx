import { useRunningOptionActions } from '@/store/runningOption';
import { reapraPrimaryColor } from '@/utils/color';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ConcurrentCard(number: number) {
  const { changeConcurrentNum } = useRunningOptionActions();
  const [rightButtonPx, setRightButtonPx] = useState(70);

  useEffect(() => {
    setRightButtonPx(70 + (number.toString().length - 1) * 10);
  }, [number]);

  console.log(rightButtonPx);

  return (
    <div className=" flex items-center justify-around p-4">
      <p className="w-7/12">同時実行人数</p>
      <p className="mr-4 ml-4 text-gray-300">|</p>
      <div className="relative  w-3/12 text-center">
        <Button
          onClick={() => {
            changeConcurrentNum(number - 1);
          }}
          style={{
            width: '70px',
            borderRadius: '0px',
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '30px',
            backgroundColor: reapraPrimaryColor,
            color: 'black',
            border: '0px',
            paddingRight: '50px',
            marginRight: '-40px',
            marginLeft: '-25px',
          }}
          disableRipple
        >
          &minus;
        </Button>
        <Button
          onClick={() => {
            changeConcurrentNum(number + 1);
          }}
          style={{
            width: `${rightButtonPx}px`,
            borderRadius: '0px',
            borderTopRightRadius: '30px',
            borderBottomRightRadius: '30px',
            backgroundColor: reapraPrimaryColor,
            border: '0px',
            color: 'black',
            position: 'absolute',
            paddingLeft: '55px',
          }}
          disableRipple
        >
          &#43;
        </Button>
        <a className="relative rounded-full border bg-white pr-4 pl-4 pt-2 pb-2 text-center">
          {number}
        </a>
      </div>
    </div>
  );
}
