

  import React,{useState} from 'react'
  import { PiKeyReturnBold } from "react-icons/pi";

  const ReturnJobDetails = ({jobDetails}) => {
      const [mountWeight, setMountWeight] = useState('');
      const [losswt, setLosswt] = useState('0.000');
    const[error,setError]=useState('');

  const grosswt = jobDetails.metalwt + jobDetails.diamondwt * 5 + jobDetails.cswt * 5 + jobDetails.miscwt


  const retjob= () =>{
    if( mountWeight < grosswt){
      const totalloss = grosswt - mountWeight;
      setLosswt(totalloss);
    }
    else{
      setError("Return Wt. should not be more than Gross Wt.")
    }
    
  }


  const retwtchange = (e) => {

    console.log(mountWeight,'mountWeight');
    setError(''); 
    setMountWeight(e.target.value);
  };

    return (
      <div className='w-full flex flex-col md:flex-row h-[30vh] bg-white justify-between rounded-xl shadow-md  items-stretch p-6 gap-6'>
      <div className='flex-1 flex flex-col justify-between rounded-lg items-start'>
        <div className="w-full max-w-md space-y-4">

          <div className='space-y-4 w-full'>
            <div>
              <label htmlFor="dept" className="block text-sm font-medium text-gray-700 mb-1">Department:</label>
              <select id="dept" className="w-full p-3 text-xl border bg-gray-100 font-semibold rounded-md " disabled>
                <option>Filing</option>   
              </select>
            </div>
            <div>
              <label htmlFor="mountWeight" className="block text-sm font-medium text-gray-700 mb-1">Return Weight:</label>
              <input
                id="mountWeight"
                type="number"
                value={mountWeight}
                onChange={(e) => retwtchange(e)}  
                placeholder="Enter Return Wt."
                className="w-full p-3 text-xl border rounded-md "
              />
                      
            </div>

    
          </div>


  <div className='flex flex-col gap-1 '> 
  <div className='h-[1.5rem]'>
  {error && (
    <p className='text-base text-red-600'>
      {error}
    </p>
  )

  }
  </div>
          <div className='flex gap-4'>
            <button
              onClick={retjob}
              className="flex-1 bg-[#7367F0] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center text-lg font-semibold">
              <PiKeyReturnBold size={24} className='mr-2' /> Return
            </button>
            <button
              onClick={() => {}}
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-300 shadow-md text-lg font-semibold"
            >
              Cancel
            </button>
          </div>

  </div>

        </div>
      </div>


  {/* <div className='flex-1 p-6 bg-blue-50 rounded-xl shadow-inner'>
        <div className='grid grid-cols-2 gap-2  text-gray-700'>
          

  <div className='flex justify-between w-[80%] items-center'>
  <span className='text-gray-500'>Diamond:</span>
  <strong className='text-lg text-gray-800'>{jobDetails.Diamond}</strong>
  </div>

  <div className='flex justify-between w-[80%] items-center'>
  <span className='text-gray-500'>Current Net:</span>
  <strong className='text-lg text-gray-800'>{jobDetails.Metal}</strong>
  </div>
  <div className='flex justify-between w-[80%] items-center'>
  <span className='text-gray-500'>Misc:</span>
  <strong className='text-lg text-gray-800'>{jobDetails.Misc}</strong>
  </div>


  <div className='flex justify-between w-[80%] items-center'>
  <span className='text-gray-500'>Current Gross:</span>
  <strong className='text-lg text-gray-800'>{jobDetails.CurrentGross}</strong>
  </div>

  <div className='flex justify-between w-[80%] items-center'>
  <span className='text-gray-500'>Color Stone:</span>
  <strong className='text-lg text-gray-800'>{jobDetails.ColorStone}</strong>
  </div>




          <hr className='col-span-2 border-gray-300 my-2' />
          <div className='flex justify-between w-[80%] items-center'>
              <span className='text-gray-500'>Loss Weight:</span>
              <strong className='text-xl text-red-600'>{losswt}</strong>
            </div>
            <div className='flex justify-between w-[80%] items-center'>
              <span className='text-gray-500'>Actual Loss:</span>
              <strong className='text-lg text-gray-800'>{jobDetails.actloss}</strong>
            </div>




      
          <hr className='col-span-2 border-gray-300 my-2' />
          <div  className='flex justify-between w-[80%] items-center'>
              <span className='text-gray-500'>Exp Loss:</span>
              <strong className='text-lg text-gray-800'>{jobDetails.exploss}</strong>
            </div>
        
          <div className='flex justify-between w-[80%] items-center'>
              <span className='text-gray-500'>Max Loss %:</span>
              <strong className='text-lg text-gray-800'>{jobDetails.maxloss}</strong>
            </div>

          
        </div>
    
      </div> */}

  <div className='flex-1 p-2 px-6 bg-blue-50 overfow-auto h-full  rounded-xl flex  justify-center shadow-inner'>
    <div className='grid grid-cols-2 gap-2 w-full text-gray-700'>
      
      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Diamond:</span>
        <strong className='text-lg text-gray-800'>{jobDetails?.diamondwt?.toFixed(3)}</strong>
      </div>

      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Current Net:</span>
        <strong className='text-lg text-gray-800'>{jobDetails?.metalwt?.toFixed(3)}</strong>
      </div>

      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Misc:</span>
        <strong className='text-lg text-gray-800'>{jobDetails?.miscwt?.toFixed(3)}</strong>
      </div>

      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Current Gross:</span>
        <strong className='text-lg text-gray-800'>{grosswt?.toFixed(3)}</strong>
      </div>

      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Color Stone:</span>
        <strong className='text-lg text-gray-800'>{jobDetails?.cswt?.toFixed(3)}</strong>
      </div>

      <hr className='col-span-2 border-gray-300 my-1' />

      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Loss Weight:</span>
        <strong className='text-xl text-red-600'>{jobDetails?.losswt?.toFixed(3)}</strong>
      </div>

      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Actual Loss:</span>
        <strong className='text-lg text-gray-800'>{jobDetails?.losswt?.toFixed(3)}</strong>
      </div>

      <hr className='col-span-2 border-gray-300 my-1' />

      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Exp Loss:</span>
        <strong className='text-lg text-gray-800'>{losswt}</strong>
      </div>
    
      <div className='flex justify-between w-[80%] items-center'>
        <span className='text-gray-500'>Max Loss %:</span>
        <strong className='text-lg text-gray-800'>{jobDetails?.maxloss}</strong>
      </div>

    </div>
  </div>

    </div>
    )
  }

  export default ReturnJobDetails
