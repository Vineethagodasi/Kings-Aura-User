import { useEffect, useState } from "react";
import { getReviewsByProduct, postReview } from "../../constants/product";
import { showError, showSuccess } from "../../utils/toast";

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [stats, setStats] = useState({
    average: 0,
    count: 0,
  });

  const [form, setForm] = useState({
    rating: 5,
    reviewtitle: "",
    reviewcontent: "",
    image: null,
  });

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getReviewsByProduct(productId);

      if (res.data?.success) {
        setReviews(res.data.data?.reviews || []);
        setStats({
          average: res.data.data?.averageRating || 0,
          count: res.data.data?.count || 0,
        });
      }
    } catch (err) {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true); // ✅ start loading

      const formData = new FormData();
      formData.append("rating", form.rating);
      formData.append("reviewtitle", form.reviewtitle);
      formData.append("reviewcontent", form.reviewcontent);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await postReview(productId, formData);

      if (res.data?.success) {
        showSuccess("Review added");
        setShowModal(false);
        fetchReviews();

        setForm({
          rating: 5,
          reviewtitle: "",
          reviewcontent: "",
          image: null,
        });
      }
    } catch (err) {
    //   showError("Failed to add review");
    console.error("Review submission error:", err);
    } finally {
      setSubmitting(false); // ✅ stop loading
    }
  };

  return (
    <div className="px-6 md:px-16 pb-24 bg-[#EDEBE8]">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="section-heading text-[26px]">Customer Reviews</h2>
          <p className="text-primary mt-1">
            ⭐ {stats.average} / 5 · {stats.count} reviews
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-black px-6 py-2 rounded-lg font-medium hover:opacity-90"
        >
          Write Review
        </button>
      </div>

      {/* REVIEWS */}
      {loading ? (
        <p className="text-subheading">Loading...</p>
      ) : reviews.length === 0 ? (
<div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-2xl border border-gray-100">
  
  {/* ICON */}
  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
    <svg
      className="w-8 h-8 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.26a1 1 0 00.95.69h6.588c.969 0 1.371 1.24.588 1.81l-5.33 3.872a1 1 0 00-.364 1.118l2.036 6.26c.3.921-.755 1.688-1.54 1.118l-5.33-3.872a1 1 0 00-1.176 0l-5.33 3.872c-.784.57-1.838-.197-1.539-1.118l2.036-6.26a1 1 0 00-.364-1.118L2.475 11.687c-.783-.57-.38-1.81.588-1.81h6.588a1 1 0 00.95-.69l2.036-6.26z"
      />
    </svg>
  </div>

  {/* TITLE */}
  <h3 className="font-cinzel text-heading text-lg mb-2">
    No Reviews Yet
  </h3>

  {/* MESSAGE */}
  <p className="text-subheading text-sm max-w-sm">
    Be the first to share your experience with this product and help others make the right choice.
  </p>

  {/* CTA BUTTON */}
  <button
    onClick={() => setShowModal(true)}
    className="mt-5 bg-primary text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
  >
    Write a Review
  </button>
</div>      ) : (
        <div className="space-y-6 grid md:grid-cols-2 lg:grid-cols-3 place-items-baseline gap-0">
          {reviews.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-2xl p-5 flex flex-col gap-5"
            >
              {/* IMAGE */}
              {item.reviewimage && (
                <img
                  src={item.reviewimage}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              )}

              {/* CONTENT */}
              <div className="f">
                {/* USER */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {item.userId?.email?.[0]?.toUpperCase()}
                  </div>

                  <div>
                    <p className="text-heading text-sm">{item.userId?.email}</p>
                    <p className="text-primary text-xs">⭐ {item.rating}</p>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="font-cinzel text-primary mt-2">
                  {item.reviewtitle}
                </h3>

                {/* CONTENT */}
                <p className="text-subheading text-sm mt-1">
                  {item.reviewcontent}
                </p>

                <p className="text-xs text-subheading/60 mt-2">
                  {new Date(item.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-[90%] md:w-[500px] rounded-3xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-heading">Add Review</h2>

            <input
              type="number"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-full border rounded-lg p-2 outline-primary"
              placeholder="Rating"
            />

            <input
              type="text"
              value={form.reviewtitle}
              onChange={(e) =>
                setForm({ ...form, reviewtitle: e.target.value })
              }
              className="w-full border rounded-lg p-2 outline-primary"
              placeholder="Title"
            />

            <textarea
              value={form.reviewcontent}
              onChange={(e) =>
                setForm({ ...form, reviewcontent: e.target.value })
              }
              className="w-full border rounded-lg p-2 outline-primary"
              placeholder="Write review..."
            />

     <div className="w-full">
  <label className="block text-sm text-subheading mb-2">
    Upload Image
  </label>

  <label className="flex items-center justify-center gap-3 border border-dashed border-primary/50 rounded-xl py-4 px-4 cursor-pointer hover:bg-primary/10 transition">
    
    {/* ICON */}
    <svg
      className="w-5 h-5 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v9m0-9l-3 3m3-3l3 3m0-9h.01"
      />
    </svg>

    <span className="text-sm text-primary font-medium">
      {form.image ? "Change Image" : "Upload Image"}
    </span>

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setForm({ ...form, image: e.target.files[0] })
      }
      className="hidden"
    />
  </label>

  {/* PREVIEW */}
  {form.image && (
    <div className="mt-3 relative w-24 h-24">
      <img
        src={URL.createObjectURL(form.image)}
        alt="preview"
        className="w-full h-full object-cover rounded-lg border"
      />

      {/* REMOVE BUTTON */}
      <button
        onClick={() =>
          setForm({ ...form, image: null })
        }
        className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  )}
</div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`flex-1 py-2 rounded-lg transition ${
                  submitting
                    ? "bg-primary/50 cursor-not-allowed"
                    : "bg-primary text-black hover:opacity-90"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductReviews;
