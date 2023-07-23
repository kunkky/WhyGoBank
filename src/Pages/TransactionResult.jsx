import { useLocation } from 'react-router-dom'
import TransactionSuccessful from '../Components/TransactionSuccessful';
import TransactionFailed from './TransactionFailed';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import html2canvas from 'html2canvas';

const TransactionResult = () => {
    const location = useLocation()
    const stateData =location.state;
    const transactionResult = stateData.transactionResult;
    const status = stateData.transStatus;

    const Navigate=useNavigate();

    const redirectHome=()=>{
        if (status === null){
                Navigate('/dashboard',
                {
                    state:{
                    message:"Error Processing Transaction",
                    status:"failure"
                    },
                    replace:true,
                }
            )
        }
    }

    //redirect home onload with message using useeffect
    useEffect(() => {
       redirectHome()
    }, [status])
    
    //goback Function
    const handleGoBack = () => {
        Navigate(-1);
    }

    //print Recipt
    const PrintReceipt = () => {
        console.log('Priint Recipt');
    }
//convert Image to Jpg

   

    const handleDownloadImage = async () => {
        const element = document.getElementById('print');
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');

        link.href = data;
        link.download = 'downloaded-image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
      <div>
    {
              status === "successful" ?
                     

                      <TransactionSuccessful handleDownloadImage={handleDownloadImage} handleGoBack={handleGoBack} PrintReceipt={PrintReceipt} transactionResult={transactionResult}/>
        :
                  <TransactionFailed handleGoBack={handleGoBack} transactionResult={transactionResult} />

    }
    </div>
  )
}

export default TransactionResult