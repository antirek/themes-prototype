export interface CardHeader {
  text: string
  textColor: string
  fontSize: number
  bold: boolean
}

export interface CardBody {
  text: string
  textColor: string
  fontSize: number
  backgroundColor: string
}

export interface CardFooter {
  text: string
  textColor: string
  fontSize: number
  align: 'left' | 'center' | 'right'
}

export interface CardData {
  header: CardHeader
  body: CardBody
  footer: CardFooter
  width: number
  backgroundColor: string
  shadow: boolean
  borderRadius: number
}
