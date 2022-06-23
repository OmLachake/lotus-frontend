function FullPageLoading() {
  return (
    <div>
      <div className="flex justify-center items-center my-10 mt-[10rem] w-full">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
          role="status"
        >
          <span className="visually-hidden text-off-purple">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default FullPageLoading;
