import react from 'react';
import reactDom from 'react-dom';
import Statuscard from 'statusCard.js'
import { makeStyles } from '@material-ui/core/styles';
import { createBrotliCompress } from 'zlib';
import Appbar from 'Appbar.js'

const app = makeStyles(theme=> ({
background: 'white',

}));

export default function View(){
    return(
        <div> 
            <Appbar></Appbar>
            <Statuscard></Statuscard>
    
        </div>
   );
}


