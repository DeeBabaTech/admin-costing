interface Overview {
  title: string;
  value: any;
  info: string;
  Icon?: React.JSX.Element;
}

function Overviews({ title, value, info, Icon }: Overview) {
  return (
    <li className='text-sm border p-4 rounded relative'>
      <p className=' text-gray-600 font-medium'>{title}</p>
      <p className='text-xl font-semibold mt-1'>{value}</p>
      <p className='text-xs'>{info}</p>
      <span className='absolute top-4 right-5 text-hover-primary'>{Icon}</span>
    </li>
  );
}

export default Overviews;
