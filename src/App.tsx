import {
  computed,
  defineComponent,
  defineVaporComponent,
  ref,
} from 'vue'
import { useRef } from 'vue-jsx-vapor'

const Comp = defineVaporComponent(({ count = 0 }) => {
  defineExpose({
    double: computed(() => count * 2),
  })
  return <span> x 2 = </span>
})

export default defineComponent(() => {
  const count = ref(1)
  const compRef = useRef()
  return () => (
    <>
      <input v-model={count.value} />
      <Comp count={count.value} ref={compRef}></Comp>
      {compRef.value?.double}
    </>
  )
})
