export const P = ({ text }: { text: string; class?: string }) => {
  return (
    <div class="overflow-hidden text-white font-700 overflow-clip text-center">
      <div
        v-for={(item, index) in text.split('')}
        key={index}
        class="text-stroke-#932D23-4 pos-relative inline-block"
        data-text={item}
      >
        {item}
      </div>
    </div>
  )
}
