import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';


const TransactionSuccessful = (props) => {
  const transactionResult = props.transactionResult;
  

  const handleDownloadImage = async () => {
  //  convertComponentToImage(componentRef.current);
    try {
      const element = document.getElementById('print');
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/jpeg'); // Changed 'image/jpg' to 'image/jpeg'

      const link = document.createElement('a');
      link.href = data;
      link.download = 'WhyGoBank_' + transactionResult.receiver_account_number + '_receipt.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error converting element to image:', error);
    }
  };
  

  return (
    <div className='w-screen h-screen p-5'>
      <div className='w-full h-auto p-5  bg-[#E4F2E7] rounded-lg' id="print">
        <h1 className='font-bold text-[#018116] text-xl mb-4'>Transfer successful</h1>
        {
          <div>
            <h1 className='bg-[#F2FEF4] rounded px-2 text-sm'>Sent to</h1>
            <h1 className='font-medium mb-1'> {transactionResult.reciever_bank_name}</h1>
            <h1 className='font-medium mb-1'>{transactionResult.receiver_account_number}</h1>
            <h1 className='font-medium mb-1'>{transactionResult.reciever_account_name}</h1>
            <small className='text-sm text-[#676773]'>Amount sent</small>
            <h1 className='font-medium mb-1'>NGN {transactionResult.amount}</h1>
            <h1 className='text-sm rounded-sm text-[#676773] bg-[#F2FEF4] px-2'>Sender Information</h1>
            <h1 className='font-medium mb-1'>From: {transactionResult.sender_account_name}</h1>
            <h1 className='font-medium mb-1'>Why GoBank</h1>
            <small className='text-sm text-[#676773]'>Reference Number</small>
            <h1 className='font-medium mb-1'>13452678929862456789154156789</h1>
          </div>          
        }
      </div>
      <div className='w-screen h-auto p-2 px-5 flex flex-col gap-2 justify-between items-center fixed bottom-0 left-0'>
        <button className='w-full rounded-sm p-3 bg-[#018116] text-[#CCE6D0]' onClick={handleDownloadImage}>Generate Receipt</button>

        <Link className='w-full rounded-sm p-3 bg-[#676773] text-[#FEFCFB] text-center' to='/transaction'>More Transaction</Link>
      </div>
    
    </div>
  )
}

export default TransactionSuccessful