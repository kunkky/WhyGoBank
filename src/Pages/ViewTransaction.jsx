import { React} from 'react'
import Nav from '../Components/Nav'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import useSingleTransaction from '../Hooks/useSingleTransaction';
import { ProgressBar } from 'react-loader-spinner'
import DateWrapper from '../Components/DateWrapper';
import html2canvas from 'html2canvas';

const ViewTransaction = () => {
    const { transactionId } = useParams();
    console.log(transactionId);
    const navigate = useNavigate();


    const handleGoBack = () => {
        navigate(-1);
    }
    const { loading, actfeedback, transaction } = useSingleTransaction("SingleTraansaction", transactionId)
    let tDate = transaction.created_at;


    const handleDownloadImage = async () => {
        //  convertComponentToImage(componentRef.current);
        try {
            const element = document.getElementById('print');
            const canvas = await html2canvas(element);
            const data = canvas.toDataURL('image/jpeg'); // Changed 'image/jpg' to 'image/jpeg'

            const link = document.createElement('a');
            link.href = data;
            link.download = 'WhyGoBank_' + transaction.reciever_account_name +'_receipt.jpg';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error converting element to image:', error);
        }
    };
  return (
  <div className='flex flex-col w-[100svw] h-[100svh] gap-4'>
          <div className=" w-full flex-col bg-white flex">

              <div className="flex px-10 h-[auto] p-1 gap-2 flex-col w-full">
                  <div className="w-full flex justify-between items-center">

                      <div className="material-symbols-outlined text-[#E6CCCE] h-[10px]" onClick={() => handleGoBack()}>
                          arrow_back_ios
                      </div>


                      <div className="h-[100%] mt-[15px] flex justify-center items-center">
                          <Link to="/profile">
                              <span className="material-symbols-outlined text-[#E6CCCE] h-[10px]">
                                  logout
                              </span>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
          <div className='p-3 flex flex-col gap-4'>
              {
                  loading === true ? < div className="flex flex-row items-center justify-center h-full w-full"> <ProgressBar
                      height="100"
                      width="100%"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor='none'
                      barColor='#000000'
                  /> </div> : 
                  <div>
                          <div className='w-full h-auto p-2 bg-[#E4F2E7]' id="print">
                            <small className='text-[10px] '> Receiver's Name</small>
                        <h1 className='m-0 text-sm'>{transaction.reciever_account_name}</h1>
                            <small className='text-[10px] '> Receiver's Account Number</small>
                        <h1 className='m-0 text-sm'>{transaction.receiver_account_number}</h1>
                            <small className='text-[10px] '> Bank</small>
                        <h1 className='m-0 text-sm'>{transaction.reciever_bank_name}</h1>
                            <small className='text-[10px] '> Date</small>
                        <h1 className='m-0 text-sm'><DateWrapper tDate={tDate} /></h1>
                            <small className='text-[10px] '> Status</small>
                        <h1 className='m-0 text-sm'>{transaction.status}</h1>
                            <small className='text-[10px] '> Naration</small>
                          <h1 className='m-0 text-sm'>{transaction.naration}</h1>
                            <small className='text-[10px] '> Reference Number</small>
                        <h1 className='m-0 text-sm'>{transaction.transation_id}</h1>
                         
                      </div>
                      <div>
                              <button onClick={handleDownloadImage} className='w-full p-2 text-center text-white bg-blue-950 rounded-sm' >Print</button>
                        </div>
                       </div>
              }
          
          </div>
      <Nav />
    </div>
  )
}

export default ViewTransaction