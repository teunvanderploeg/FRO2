<template>
<Header :totalIncome="state.totalIncome" />
<Form @add-income="AddIncome" />
<IncomeList :state="state" />
</template>

<script>
import {reactive, computed} from 'vue';
import Header from './components/Header';
import Form from './components/Form';
import IncomeList from './components/IncomeList';

export default {
  setup(){
    const state = reactive({
      income: [],
      totalIncome: computed(() => {
        let temp = 0;
        if (state.income.length > 0){
          for (let i = 0; i < state.income.length; i++){
            temp += state.income[i].value;
          }
        }

        return temp;
      }),
      sortedIncome: computed(() => {
        let temp = [];

        temp = state.income.sort(function (a,b){
          return b.date - a.date;
        });
        return temp;
      })
    });

    function AddIncome(data){
      let d = data.date.split("-");
      let newD = new Date(d[0], d[1], d[2]);

      state.income = [...state.income, {
        id: Date.now(),
        desc: data.desc,
        value: parseInt(data.value),
        date: newD.getTime(),
        url: data.url,
      }];
      console.log(state.income);
    }

    return{
    Header, Form, IncomeList, state, AddIncome
    }
  }
}

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}
body{
  background: rgb(93, 93, 93);
}
</style>
