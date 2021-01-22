<template>
  <div class="income-item">
    
      <div class="desc">{{ income.desc }}</div>
      <div class="price">€{{ income.value }}</div>
      <div class="date">{{ formattedDate }}</div>
      <div class="url"><img class="url" v-bind:src="income.url"  alt="img"></div>
  </div>
</template>

<script>
export default {
    props:{
        income: Object
    },
    setup(props){
        let date = new Date(props.income.date);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let formattedDate = day +  "/" + month +  "/" + year;
        return{
            formattedDate
        }
    }
}
</script>

<style>
.income-item {
    position: relative;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 15px 15px 15px 0px;
    background-color: #FFF;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto 30px;
  }
  .removeItem {
    color: #EF2D2D;
    font-weight: 600;
    font-size: 20px;
    line-height: 1;
    text-align: center;
    margin: 0 15px;
  }
  .desc {
    padding-left:1em ;
    padding-top: 1.8em;
    color: #666;
    flex: 0.9 1 20%;
    font-size: 20px;
  }
  .price {
    padding-top: 1.8em;
    color: #666;
    min-width: 100px;
    font-size: 20px;
  }
  .date {
    padding-top: 1.8em;
    color: #666;
    text-align: center;
    font-size: 20px;
  }
  .url {
    color: #666;
    text-align: right;
    font-size: 20px;
    height: 5em;
  }
</style>