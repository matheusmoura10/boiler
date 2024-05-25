import express, { Request, Response } from "express";

export default abstract class FileReaderInterface {
  abstract readFile(path: string): Promise<any>;
}
