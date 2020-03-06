import React from 'react';
import './DogApp.css';

export function LikeCounter({ dogsLiked }) {
  return (
    <div className="LikeCounter">
      Number of pictures liked: {dogsLiked.length}
    </div>
  );
}
