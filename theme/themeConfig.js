import { Collapse } from "@mui/material";
import {
  bgcolor,
  border,
  borderColor,
  color,
  fontSize,
  gap,
  width,
} from "@mui/system";
import { ColorPicker } from "antd";
import { Label } from "recharts";

const theme = {
  token: {
    fontSize: 18,
    colorPrimary: "#52c41a",
  },
  components: {
    Popconfirm: {
      colorTextHeading: "white",
    },
    Typography: {
      colorText: "#ffffff",
    },
    Progress: {
      colorText: "#ffffff",
    },
    Collapse: {
      colorText: "rgba(255, 255, 255, 0.8)",
      colorTextHeading: "rgba(255, 255, 255, 1)",
      colorBgContainer: "#333333",
      colorBorder: "#333333",
    },
  },
};

export default theme;
