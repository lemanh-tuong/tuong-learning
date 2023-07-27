import { Request, Response } from 'express'

export type GetServerSideProps<T> = (request: Request, response: Response) => T | Promise<T> 