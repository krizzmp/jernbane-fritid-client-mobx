import { observer } from "mobx-react";
import { TextInput } from "./store";
import TextField from "@material-ui/core/TextField";
import React from "react";
import styled from "@emotion/styled";

const Container = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: 16
});
export const Input = observer((p: { src: TextInput }) => {
  return (
    <Container>
      <TextField
        id={p.src.id}
        label={p.src.label}
        value={p.src.value}
        onChange={e => (p.src.value = e.target.value)}
        fullWidth
        variant="outlined"
        error={!!p.src.error}
        helperText={p.src.error || p.src.description}
      />
    </Container>
  );
});