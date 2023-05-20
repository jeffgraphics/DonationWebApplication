import Swal from "sweetalert2";

export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const alertSuccess = (message) => {
  return Swal.fire({
    icon: "success",
    title: "Sucesss!!",
    text: `${message}`,
  });
};

export const alertError = (message) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${message}`,
  });
};

export const shortenText = (text, requiredLen) => {
  if (!text) return "";

  const requiredWordLen = 20;

  const words = text.split(" ");

  if (words.length <= requiredWordLen) return text;

  return `${words.slice(0, requiredWordLen + 1).join(" ")}...`;
};
