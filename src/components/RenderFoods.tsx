import Item from "./Item";
import { Grid, styled } from "@mui/material";

const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "0.25em",
}));

//render the grid of foods
function RenderFoods(foodList: Food) {
  const foodItems = foodList.map((item) => {
    return (
      <Grid item xs={4} key={item.id}>
        <Item key={item.id} {...item} />
      </Grid>
    );
  });
  return (
    <StyledGrid container spacing={2}>
      {foodItems}
    </StyledGrid>
  );
}

export default RenderFoods;
