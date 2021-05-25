import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { Appbar } from 'react-native-paper';

import App2 from './App2'

const buttons=[//buttons structure
    ['C', '<---'],
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', 'x'],
    ['=', '0', '.', '%']
];

export default class App extends React.Component {

constructor()
{//variables initialization
    super()
    this.initialState={
        fv:'',
        sv:'',
        nv:false,//nv will be true if an operator is used
        toPrint:'0',
        operator:null
    }
    this.state=this.initialState;
}

renderButtons(){//returns layouts/pattern/structure of buttons
    let buttonStructure = buttons.map((buttonRows, index)=>{
        let vartostore = buttonRows.map((buttonItems, buttonIndex)=>{//initializing variables from second file
            return <App2
            value={buttonItems}
            handleOnPress={this.handleInput.bind(this,buttonItems)}
               key= {'btn-' + buttonIndex} />
        });
        return <View style={{flex: 1,flexDirection: 'row'}} key={'row-' + index}>
        {vartostore}
        </View>
    });
    return buttonStructure
}    

handleInput=(passthevalue)=>{

const {toPrint, operator, fv, sv, nv}=this.state;

switch(passthevalue)
{
    case 'C':
        this.setState(this.initialState)//set to 0(Zero)
    break;

    case '<---':
    let string=toPrint.toString();//passed values are converted to string and stored in string variable
    let termination=string.substr(0,string.length-1);//creates a substring starting from the element at index passed as first parametr to the element at index 1 less than the index passed as second parameter
    let length=string.length;//e.g if 38596 is passed as string the substr function will return string from index 0 to (length-1)-1 i.e 3859
    if(length==1)//in this way the backspace button will remove the last element from the current state
    {
       this.setState({
          toPrint:0,
          fv:0
       })
    }//this if else describes that after termination i.e. substr function, if the length is 1 then it means currently there will be 0
    else//else if the length is greater than 1 the string after substr function is stored in toPrint and printed afterwards
    {
       this.setState({
          toPrint:termination,
          fv:termination
       })
    }
    break;

    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    //if the passed value is 0 it is simply printed
    if(toPrint=='0')
    {
       this.setState({
            toPrint:passthevalue
        })
    }
    else
    {//else if the passed value is not zero it is printed afterwards teh already stored value
       this.setState({
            toPrint:toPrint+passthevalue
       })
    }

    if(nv)//if operator is used i.e variable nv is true it meeans the latest passed value is added to/printed afterwards second value i.e operator
    {//else the latest passed value will be printed as the first placed value
        this.setState({
            sv:sv+passthevalue
        })
    }
    else
    {
        this.setState({
            fv:fv+passthevalue
        })
    }

    break;

    case '.':
    let dot=toPrint.toString().slice(-1)//avoiding two consecutive dots

    if(dot!='.')//if dot after a dot is entered it is sliced otherwise the passed value is stored and printed after dot
    {
        this.setState({
            toPrint:toPrint+passthevalue
        })
    }
    else
    {
        this.setState({
            toPrint:toPrint
        })
    }

    if(!nv)//nv is true if operator is used
    {
        this.setState({
            fv:fv+passthevalue
        })
    }
    else
    {
        this.setState({
             sv:sv+passthevalue
        })
    }
    break;

    case '+':
    case '-':
    case 'x':
    case '%':

    this.setState({
    nv:true,//it means that operator has been used
    operator:passthevalue,//if there is already an operator then using substr function the already written operator is ignored and the latest entered operator is stored
    toPrint: (operator!=null ? toPrint.substr(0,toPrint.length-1) : toPrint)+passthevalue
    })
    break;

    case '=':
    let divandmuloperator= (operator=='x') ? '*' : (operator=='%') ? '/' : operator//x from keyboard is used as multiply sign and % is used as division sign and + - are simply stored
    let result=eval(fv+divandmuloperator+sv)//eval function performs mathematical operations
    
    this.setState({//if result mod 1 is 0  it is simply stored and printed else it is stored as 3 integers after the decimal point
        
        toPrint: result%1 === 0 ? result: result.toFixed(3),
        fv: result%1 === 0 ? result: result.toFixed(3),//result will be stored as first value

        sv: '',//second value will again be empty i.e the next entered value will either be second value or operator
        operator:null,//operator will again become null i.e. the result does not contain any operator
        nv:false
    })
    break;

}
}
render()
    {
      return (
        <View style={styles.container}>
           <Appbar.Header>
              <Appbar.Content title="Calculator" style={{alignItems:"center",backgroundColor:"#ba55d3",margin:55}}/>
           </Appbar.Header>
           <View style={{flex: 4,justifyContent:'center',backgroundColor: '#dc143c',borderRadius:15,marginTop:3}}>
              <Text style={{color:'white',fontSize:60,marginTop:1,marginBottom:10,padding:10,fontWeight:'bold',textAlign:'right'}}>
                 {this.state.toPrint}
              </Text>
           </View>
           <View style={{flex: .3, backgroundColor:'white',alignItems: 'center',marginLeft:60,marginRight:60,fontWeight:'bold'}}>
                 <Text style={{ fontSize: 10, padding:.1, color:'grey'}}>----------------------------------------</Text>
           </View>
           <View style={{flex: 8,backgroundColor: '#cd5c5c'}}>
              {this.renderButtons()}
           </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
