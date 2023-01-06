import { Router } from "express";

export type TRoute = {
  path: string;
  controller: Router;
}