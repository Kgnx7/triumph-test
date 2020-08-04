import { string, object } from 'yup'

export default object().shape({
    id: string().required(),
    name: string().required(),
    type: string().required(),
    color: string().required(), //.matches(/#/),
})
