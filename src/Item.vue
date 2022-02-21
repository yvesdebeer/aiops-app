<template>
  <div class="d-flex flex-row mb-3">
    <div class="d-flex flex-column p-3">
        <p class="mb-2">{{item.description}}</p>
        <small class="text-muted">{{item.solution}}</small>
    </div>
  </div>
</template>

<script>

export default {
    name: 'item',
    props: ['item'],
    data() {
        return {
            size: ''
        }
    },
    filters: {
        shortDescription(value) {
        if (value && value.length > 70) {
            return value.substring(0, 70) + '...';
        } else {
            return value;
        }
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

body {
    background-color: #E7E9F5;
    font-family: 'Heebo', sans-serif
}

.card {
    width: 500px;
    border: none;
    border-radius: 20px
}

.form-control {
    border-radius: 7px;
    border: 1.5px solid #E3E6ED
}

input.form-control:focus {
    box-shadow: none;
    border: 1.5px solid #E3E6ED;
    background-color: #F7F8FD;
    letter-spacing: 1px
}

.btn-primary {
    background-color: #5878FF !important;
    border-radius: 7px
}

.btn-primary:focus {
    box-shadow: none
}

.text {
    font-size: 13px;
    color: #9CA1A4
    
}

.flex-row {
    border: 1px solid #F2F2F4;
    border-radius: 10px;
    margin: 0 1px 0
}

.flex-column p {
    font-size: 14px
}

span.mb-2 {
    font-size: 12px;
    text-align: left;
    color: #8896BD
}

h5 span {
    color: #869099
}

@media screen and (max-width: 450px) {
    .card {
        display: flex;
        justify-content: center;
        text-align: center
    }

    .price {
        border: none;
        margin: 0 auto
    }
}
</style>