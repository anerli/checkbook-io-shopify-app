import React from 'react';
import ReactDom from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { createBrotliCompress } from 'zlib';
import Appbar from './Appbar';
import Status from './StatusCard';

const app = makeStyles(theme=> ({
background: 'white',

}));

export default function View(){
    return(
        <div> 
            <Appbar></Appbar>
            <Status></Status>
        </div>
   );
}


