import { memo } from "react"

interface Props {
  onPrev: () => void
  onNext: () => void
}
export const NavigateButtons = memo(({ onPrev, onNext }: Props) => {
  return (
    <div>
      <button onClick={onPrev}>назад</button>
      <button onClick={onNext}>вперед</button>
    </div>
  )
})
