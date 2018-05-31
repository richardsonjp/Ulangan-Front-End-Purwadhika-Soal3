import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import {TabView,TabPanel} from 'primereact/components/tabview/TabView';
import {InputText} from 'primereact/components/inputtext/InputText';

class App extends Component {

  constructor(){
    super()
    this.state={
      currency: '',
    }
  }

  componentDidMount(){
    axios.get('https://blockchain.info/ticker')
    .then((ambildata) => {
    console.log(ambildata)
    this.setState({
      currency0: ambildata.data.AUD.buy,
      currency1: ambildata.data.AUD.sell,
      currency2: ambildata.data.EUR.buy,
      currency3: ambildata.data.EUR.sell,
      currency4: ambildata.data.GBP.buy,
      currency5: ambildata.data.GBP.sell,
      currency6: ambildata.data.JPY.buy,
      currency7: ambildata.data.JPY.sell,
      currency8: ambildata.data.USD.buy,
      currency9: ambildata.data.USD.sell,

    })
    })
  }

rptobit(convrp){
  var data = 'https://blockchain.info/tobtc?currency=USD&value=' + (convrp/14000)
  axios.get(data)
  .then((conv)=>{
    console.log(conv.data)
    this.setState({
      rptobit: 'Rp. '+ convrp + ' = BTC ' + conv.data
    })
  })
}

bittorp(convbit){
  var data = 'https://blockchain.info/tobtc?currency=USD&value=' + (convbit*14000)
  axios.get(data)
  .then((conv)=>{
    console.log(conv.data)
    this.setState({
      bittorp: convbit + ' BTC = Rp. ' + conv.data
    })
  })
}



  render(){
    return (
      <div className="app">

      <div>
        <TabView>
          <TabPanel className="home" header="Home">
        
        <h1>Harga Bitcoin hari ini</h1>

        <center><tr>
          <th>Mata Uang</th>
          <th>Harga Beli Bitcoin</th>
          <th>Harga Jual Bitcoin</th>
        </tr> 
         <tr>
          <td>Dollar Australia</td>
          <td>{this.state.currency0}</td>
          <td>{this.state.currency1}</td>
        </tr> 
         <tr>
          <td>Euro Eropa</td>
          <td>{this.state.currency2}</td>
          <td>{this.state.currency3}</td>
        </tr> 
         <tr>
          <td>Poundsterling Inggris</td>
          <td>{this.state.currency4}</td>
          <td>{this.state.currency5}</td>
        </tr> 
         <tr>
          <td>Yen Jepang</td>
          <td>{this.state.currency6}</td>
          <td>{this.state.currency7}</td>
        </tr> 
         <tr>
          <td>Dollar America</td>
          <td>{this.state.currency8}</td>
          <td>{this.state.currency9}</td>    
        </tr></center>
 
      
          </TabPanel>
            <TabPanel header="Rupiah ke Bitcoin">
              <h2>Konversi Rupiah ke Bitcoin </h2>
              <h4>Kurs 1 USD = 14.000 IDR</h4>
              <InputText type="number" style={{width:'50%'}} onChange={(x) => this.setState({userinput: x.target.value}, this.rptobit(x.target.value))} placeholder="Silahkan Input Nominal Rupiah..."/>
              <h4>{this.state.rptobit}</h4>
            </TabPanel>
            <TabPanel header="Bitcoin ke Rupiah">
              <h2>Konversi Bitcoin ke Rupiah </h2>
                <h4>Kurs 1 USD = 14.000 IDR</h4>
                <InputText type="number" style={{width:'50%'}} onChange={(x) => this.setState({inputbitcoin: x.target.value}, this.bittorp(x.target.value))} placeholder="Silahkan Input Nominal Bitcoin..."/>
              <h4>{this.state.bittorp}</h4>
            </TabPanel>
          </TabView>
        </div>
    </div>
    )
  }
}

export default App;
