import { TitleProp } from "@/type/types"

type Props = {
    title: TitleProp
  }

const Title = ({title}: Props) => {
  return (
    <h1 className="text-5xl text-amber-800 font-bold font-stretch-extra-condensed">{title}</h1>
  )
}

export default Title