import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, Check } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { reviewModalProduct, setReviewModalProduct, addReview, user, showToast } = useStore();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState(user.fullName || 'Dhruv Pratap Singh');
  const [verified, setVerified] = useState(true);

  if (!reviewModalProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      showToast('Please enter both a title and review comments', 'warning');
      return;
    }

    addReview(reviewModalProduct.id, {
      author: authorName.trim() || 'Anonymous Adopter',
      rating,
      title: title.trim(),
      comment: comment.trim(),
      verifiedPurchase: verified,
      bearAdopted: reviewModalProduct.name,
    });

    setReviewModalProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-6">
        <div className="p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-[#F4EFEA]">
          <div>
            <h3 className="text-base font-bold text-[#2C241E] font-display">
              Review Your Bear Companion
            </h3>
            <p className="text-xs text-[#7A6C5F]">{reviewModalProduct.name}</p>
          </div>
          <button
            onClick={() => setReviewModalProduct(null)}
            className="text-[#7A6C5F] hover:text-[#2C241E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Star selector */}
          <div>
            <label className="block font-semibold text-[#2C241E] mb-2">Overall Quality &amp; Snuggle Rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 text-[#D4AF37] transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating) ? 'fill-current' : 'text-[#D8CEBE]'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-sm text-[#2C241E]">{rating} of 5 Stars</span>
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#5C4F44] mb-1">Your Name</label>
            <input
              type="text"
              required
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
            />
          </div>

          <div>
            <label className="block font-medium text-[#5C4F44] mb-1">Review Headline</label>
            <input
              type="text"
              required
              placeholder="e.g. Heirloom quality beyond expectations!"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
            />
          </div>

          <div>
            <label className="block font-medium text-[#5C4F44] mb-1">Your Experience &amp; Craftsmanship Feedback</label>
            <textarea
              required
              rows={4}
              placeholder="Tell other adopters about the fur texture, joints, weight, and emotional comfort..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E8DFC8] rounded-lg focus:outline-none focus:border-[#9C5B16]"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#5C4F44]">
              <input
                type="checkbox"
                checked={verified}
                onChange={e => setVerified(e.target.checked)}
                className="rounded border-[#E8DFC8] text-[#9C5B16]"
              />
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#366B40]" />
                I am a verified adopter of this bear
              </span>
            </label>
          </div>

          <div className="pt-3 border-t border-[#E8DFC8] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setReviewModalProduct(null)}
              className="px-4 py-2 rounded-lg border border-[#E8DFC8] text-[#5C4F44] hover:bg-[#F2ECE4] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#2C241E] text-white hover:bg-[#3D332B] font-semibold cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
