export function restrict(number, low, high)
{
	if(number < low)
	{
		number = low;
	}
	else if(number > high)
	{
		number = high;
	}
}