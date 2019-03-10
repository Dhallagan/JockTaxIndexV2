import {format} from 'date-fns'
import * as numeral from 'numeral'
// var Helpers = {
//   MMDDYYYY (date) {
//     format(date, 'MM/DD/YYYY')
//   }
// }

// export default Helpers

export const Helpers = {
  methods: {
    MMDDYYYY (date) {
      return format(date, 'MM/DD/YYYY')
    }
  }
}

export const Numbers = {
  methods: {
    Num (number) {
      return numeral(number).format('0,0')
    }
  }
}
