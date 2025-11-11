import { Grid } from "@mui/material";
import { IconText } from "../IconText";
import { ServicesList } from "../utils";
import servicesHero from "../images/HairServices.jpeg";

export const Services = () => {
  return (
    <>
      {/* Featured large image */}
      <div className="pageFeatured">
        <img src={servicesHero} alt="Our services" className="pageFeaturedMedia" />
      </div>
      <Grid
        className="servicesList"
        container
        justifyContent={"space-evenly"}
        alignItems={"baseline"}
        marginTop={10}
        flexDirection={"row"}
      >
        {ServicesList.map((item: any) => {
          return (
            <IconText
              text={item.title}
              key={item.title}
              Icon={item.img}
              isNails={item.nailsEnhancement}
            >
              <ul className="serviceList">
                {item.list.map((itemList: string, index: number) => (
                  <li key={index + "" + itemList}>{itemList}</li>
                ))}
              </ul>

              {item.nailsEnhancement?.length > 0 && (
                <>
                  <hr className="borderSpacing" />
                  <Grid
                    container
                    justifyContent={"space-evenly"}
                    alignItems={"baseline"}
                    flexDirection={"row"}
                  >
                    {item.nailsEnhancement.map((nails: any) => {
                      return (
                        <IconText text={nails.name}>
                          <ul className="serviceList">
                            {nails.list.map(
                              (itemList: string, index: number) => (
                                <li key={index + "" + itemList}>{itemList}</li>
                              )
                            )}
                          </ul>
                        </IconText>
                      );
                    })}
                  </Grid>
                </>
              )}
            </IconText>
          );
        })}
      </Grid>
    </>
  );
};
