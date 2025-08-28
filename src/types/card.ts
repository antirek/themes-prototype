export interface CardHeader {
  text: string
}

export interface CardBody {
  text: string
}

export interface CardFooter {
  text: string
  align?: 'left' | 'center' | 'right'
}

export interface CardData {
  header: CardHeader
  body: CardBody
  footer: CardFooter
}
