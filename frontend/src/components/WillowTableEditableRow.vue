<template>
  <!-- <tr>
    <td>
      <willow-button @click.native="handleAdd()">Add</willow-button>
    </td>
  </tr> -->
  <tr>
    <td v-for="heading in headings" :key="heading">
      <slot :name="heading" :item="row"/>
    </td>
    <td>
      <willow-button>Edit</willow-button>
      <willow-button>Delete</willow-button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    headings: Array,
    row: Object
  }
}
</script>
