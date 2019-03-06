<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th v-for="(heading, i) in headings" aria-colindex="1" class="" :key="i" @click="setSortBy(heading, heading != sortBy || sortDirection == 'desc' ? 'asc' : 'desc')">{{heading}}</th>
      </tr>
    </thead>

    <tbody>
      <!-- <tr>
        <td v-for="heading in headings" :key="heading">
          <input class="form-control" />
        </td>
        <td>
          <willow-button @click.native="handleAdd()">Add</willow-button>
        </td>
      </tr> -->
      <tr v-for="(item, i) in rows" :key="i">
        <td v-for="heading in headings" :key="heading">
          <slot :name="heading" :item="item"/>
        </td>
        <!-- <td>
          <willow-button>Edit</willow-button>
          <willow-button>Delete</willow-button>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headings: {
      type: Array
    },
    rows: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleAdd () {
      alert('add')
    }
  }
}
</script>
