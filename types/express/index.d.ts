import "express";
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string; // or whatever type your userId is
  }
}