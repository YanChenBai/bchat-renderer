import { defineComponent } from 'vue'

const Comp = defineComponent(() => {
  const slots = defineSlots<{
    default: (props: { val: number }) => any
  }>()

  const Item = slots.default

  if (!Item) throw new Error('no default slot')

  return () => (
    <div>
      <div v-for={val in 20}>
        <Item val={val} />
      </div>
    </div>
  )
})

export default defineComponent(() => {
  return () => (
    <Comp v-slot={{ val }}>
      <div>{val}</div>
    </Comp>
  )
})
