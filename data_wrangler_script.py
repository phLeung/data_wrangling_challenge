import pandas as pd
"""
To handle the error: urlopen error [SSL: CERTIFICATE_VERIFY_FAILED]
certificate verify failed, please refer to this link:
https://stackoverflow.com/questions/50236117/scraping-ssl-certificate-verify-failed-error-for-http-en-wikipedia-org

If you are using a mac and encounter this error,
then go to Applications > Python > Install Certificates.command.

"""
MONTHLY_EXCEL_URL = "https://www.eia.gov/dnav/ng/hist_xls/RNGWHHDm.xls"
DAILY_EXCEL_URL = "https://www.eia.gov/dnav/ng/hist_xls/RNGWHHDd.xls"
WEEKLY_EXCEL_URL = "https://www.eia.gov/dnav/ng/hist_xls/RNGWHHDw.xls"

"""
using pandas, extract data from excel files to
convert excel files of natural gases
to pandas dataframes
"""
def get_prices(excel_url):
    df_prices = pd.read_excel(excel_url,sheet_name="Data 1", skiprows=2, names= ['Date','Price'])
    return df_prices

#parse the months so that the date is the first date of the month
#format month as %Y-%m-01
def parse_month():
    df_monthly_prices = get_prices(MONTHLY_EXCEL_URL)
    df_monthly_prices['Date'] = df_monthly_prices['Date'].values.astype('datetime64[M]')
    return df_monthly_prices

def main():
    #get natural gas prices as data frames
    df_daily_prices = get_prices(DAILY_EXCEL_URL)
    df_weekly_prices = get_prices(WEEKLY_EXCEL_URL)
    df_monthly_prices = parse_month()

    df_daily_prices.to_csv("./data/daily_prices.csv",sep=',',index=False)
    df_weekly_prices.to_csv("./data/weekly_prices.csv",sep=',',index=False)
    df_monthly_prices.to_csv("./data/monthly_prices.csv",sep=',',index=False)


if __name__ == '__main__':
    main()
    
